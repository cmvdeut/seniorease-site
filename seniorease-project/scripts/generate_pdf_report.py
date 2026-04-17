#!/usr/bin/env python3
"""
Marketing Audit PDF Report Generator
AI Marketing Suite — /market report-pdf
"""

import json
import sys
import math
from datetime import datetime
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm, cm
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, PageBreak, KeepTogether
)
from reportlab.platypus.flowables import Flowable
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.graphics.shapes import Drawing, Circle, String, Rect, Line
from reportlab.graphics import renderPDF

# ── Color Palette ─────────────────────────────────────────────────────────────
C_NAVY     = colors.HexColor('#1B2A4A')
C_BLUE     = colors.HexColor('#2D5BFF')
C_ORANGE   = colors.HexColor('#FF6B35')
C_GREEN    = colors.HexColor('#00C853')
C_AMBER    = colors.HexColor('#FFB300')
C_RED      = colors.HexColor('#FF1744')
C_LIGHT    = colors.HexColor('#F5F7FA')
C_BODY     = colors.HexColor('#2C3E50')
C_MUTED    = colors.HexColor('#7F8C9B')
C_BORDER   = colors.HexColor('#E0E6ED')
C_WHITE    = colors.white
C_ACCENT   = colors.HexColor('#E8F0FE')

PAGE_W, PAGE_H = A4
MARGIN = 2.0 * cm
CONTENT_W = PAGE_W - 2 * MARGIN


def score_color(score):
    if score >= 80: return C_GREEN
    if score >= 60: return C_BLUE
    if score >= 40: return C_AMBER
    return C_RED


def score_grade(score):
    if score >= 85: return 'A'
    if score >= 70: return 'B'
    if score >= 55: return 'C'
    if score >= 40: return 'D'
    return 'F'


def score_label(score):
    if score >= 80: return 'Uitstekend'
    if score >= 60: return 'Goed'
    if score >= 40: return 'Aandacht'
    return 'Kritiek'


# ── Gauge Flowable ─────────────────────────────────────────────────────────────
class ScoreGauge(Flowable):
    def __init__(self, score, width=120, height=80):
        super().__init__()
        self.score = score
        self.width = width
        self.height = height

    def draw(self):
        cx = self.width / 2
        cy = 10
        r = 42
        stroke_w = 14

        self.canv.saveState()
        self.canv.translate(cx, cy)

        # Background semicircle (180 degrees, left to right = 0 to 180)
        bg = colors.HexColor('#E8ECF0')
        self.canv.setStrokeColor(bg)
        self.canv.setLineWidth(stroke_w)
        self.canv.setLineCap(1)
        self.canv.arc(-r, 0, r, 2 * r, startAng=0, extent=180)

        # Score arc
        arc_extent = (self.score / 100.0) * 180
        sc = score_color(self.score)
        self.canv.setStrokeColor(sc)
        self.canv.setLineWidth(stroke_w)
        self.canv.arc(-r, 0, r, 2 * r, startAng=0, extent=arc_extent)

        # Score text
        self.canv.setFillColor(C_NAVY)
        self.canv.setFont('Helvetica-Bold', 26)
        self.canv.drawCentredString(0, r - 8, str(self.score))

        self.canv.setFont('Helvetica', 8)
        self.canv.setFillColor(C_MUTED)
        self.canv.drawCentredString(0, r - 20, '/100')

        grade = score_grade(self.score)
        self.canv.setFont('Helvetica-Bold', 12)
        self.canv.setFillColor(sc)
        self.canv.drawCentredString(0, -6, f'Grade: {grade}')

        self.canv.restoreState()

    def wrap(self, *args):
        return self.width, self.height


# ── Bar Chart Flowable ─────────────────────────────────────────────────────────
class CategoryBarChart(Flowable):
    def __init__(self, categories, width=None, height=None):
        super().__init__()
        self.categories = categories
        self.width = width or CONTENT_W
        self.height = height or (len(categories) * 28 + 10)

    def draw(self):
        bar_max = self.width - 160
        row_h = 26
        y = self.height - 14

        for name, info in self.categories.items():
            score = info['score']
            sc = score_color(score)

            # Label
            self.canv.setFont('Helvetica', 8)
            self.canv.setFillColor(C_BODY)
            self.canv.drawString(0, y - 5, name)

            # Background bar
            bx = 155
            self.canv.setFillColor(C_LIGHT)
            self.canv.rect(bx, y - 4, bar_max, 14, fill=1, stroke=0)

            # Score bar
            bar_w = (score / 100) * bar_max
            self.canv.setFillColor(sc)
            self.canv.rect(bx, y - 4, bar_w, 14, fill=1, stroke=0)

            # Score text
            self.canv.setFont('Helvetica-Bold', 9)
            self.canv.setFillColor(C_WHITE if bar_w > 30 else C_BODY)
            if bar_w > 30:
                self.canv.drawString(bx + bar_w - 28, y, f'{score}/100')
            else:
                self.canv.setFillColor(C_BODY)
                self.canv.drawString(bx + bar_w + 4, y, f'{score}/100')

            y -= row_h

    def wrap(self, *args):
        return self.width, self.height


# ── Styles ──────────────────────────────────────────────────────────────────────
def build_styles():
    styles = getSampleStyleSheet()

    def add(name, **kw):
        styles.add(ParagraphStyle(name=name, **kw))

    add('CoverTitle',
        fontName='Helvetica-Bold', fontSize=28, textColor=C_WHITE,
        spaceAfter=6, leading=34, alignment=TA_CENTER)
    add('CoverSubtitle',
        fontName='Helvetica', fontSize=13, textColor=colors.HexColor('#B8C8E8'),
        spaceAfter=4, leading=18, alignment=TA_CENTER)
    add('CoverURL',
        fontName='Helvetica', fontSize=10, textColor=colors.HexColor('#90A8C8'),
        spaceAfter=2, leading=14, alignment=TA_CENTER)
    add('SectionTitle',
        fontName='Helvetica-Bold', fontSize=16, textColor=C_NAVY,
        spaceBefore=16, spaceAfter=8, leading=20)
    add('SubTitle',
        fontName='Helvetica-Bold', fontSize=12, textColor=C_NAVY,
        spaceBefore=10, spaceAfter=4, leading=16)
    add('BodyText2',
        fontName='Helvetica', fontSize=9, textColor=C_BODY,
        spaceAfter=4, leading=14)
    add('Caption',
        fontName='Helvetica', fontSize=8, textColor=C_MUTED,
        spaceAfter=2, leading=12, alignment=TA_CENTER)
    add('ActionItem',
        fontName='Helvetica', fontSize=9, textColor=C_BODY,
        spaceAfter=3, leading=14, leftIndent=12)
    add('FindingText',
        fontName='Helvetica', fontSize=8.5, textColor=C_BODY,
        spaceAfter=2, leading=13)

    return styles


# ── Header / Footer ─────────────────────────────────────────────────────────────
def make_header_footer(brand, url):
    def on_page(canvas, doc):
        canvas.saveState()
        pn = doc.page

        if pn == 1:
            # Cover: full navy background
            canvas.setFillColor(C_NAVY)
            canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
            # Accent strip
            canvas.setFillColor(C_BLUE)
            canvas.rect(0, PAGE_H * 0.38, PAGE_W, 4, fill=1, stroke=0)
        else:
            # Header bar
            canvas.setFillColor(C_NAVY)
            canvas.rect(0, PAGE_H - 18 * mm, PAGE_W, 18 * mm, fill=1, stroke=0)
            canvas.setFont('Helvetica-Bold', 9)
            canvas.setFillColor(C_WHITE)
            canvas.drawString(MARGIN, PAGE_H - 11 * mm, f'Marketing Audit — {brand}')
            canvas.setFont('Helvetica', 8)
            canvas.setFillColor(colors.HexColor('#90A8C8'))
            canvas.drawRightString(PAGE_W - MARGIN, PAGE_H - 11 * mm, url)

            # Footer
            canvas.setFillColor(C_LIGHT)
            canvas.rect(0, 0, PAGE_W, 10 * mm, fill=1, stroke=0)
            canvas.setFont('Helvetica', 7)
            canvas.setFillColor(C_MUTED)
            canvas.drawString(MARGIN, 3.5 * mm, 'Gegenereerd door AI Marketing Suite')
            canvas.drawRightString(PAGE_W - MARGIN, 3.5 * mm, f'Pagina {pn}')

        canvas.restoreState()

    return on_page


# ── Build PDF ───────────────────────────────────────────────────────────────────
def build_pdf(data, output_path):
    styles = build_styles()
    brand = data.get('brand_name', 'Onbekend')
    url = data.get('url', '')
    date = data.get('date', datetime.today().strftime('%d %B %Y'))
    score = int(data.get('overall_score', 0))
    summary = data.get('executive_summary', '')
    categories = data.get('categories', {})
    findings = data.get('findings', [])
    quick_wins = data.get('quick_wins', [])
    medium_term = data.get('medium_term', [])
    strategic = data.get('strategic', [])
    competitors = data.get('competitors', [])

    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=2.2 * cm,
        bottomMargin=1.5 * cm,
        title=f'Marketing Audit — {brand}',
        author='AI Marketing Suite',
    )

    story = []

    # ── PAGE 1: COVER ─────────────────────────────────────────────────────────
    story.append(Spacer(1, 3.8 * cm))
    story.append(Paragraph('MARKETING AUDIT RAPPORT', styles['CoverTitle']))
    story.append(Spacer(1, 0.3 * cm))
    story.append(Paragraph(brand, ParagraphStyle(
        'BrandName', fontName='Helvetica', fontSize=16,
        textColor=colors.HexColor('#90A8C8'), alignment=TA_CENTER, leading=20)))
    story.append(Spacer(1, 0.15 * cm))
    story.append(Paragraph(url, styles['CoverURL']))
    story.append(Paragraph(date, styles['CoverURL']))
    story.append(Spacer(1, 1.4 * cm))

    # Score gauge centred on cover
    gauge = ScoreGauge(score, width=140, height=90)
    gauge_table = Table([[gauge]], colWidths=[CONTENT_W])
    gauge_table.setStyle(TableStyle([('ALIGN', (0,0), (-1,-1), 'CENTER')]))
    story.append(gauge_table)
    story.append(Spacer(1, 0.6 * cm))

    # Executive summary on cover
    if summary:
        summary_style = ParagraphStyle(
            'CoverSummary', fontName='Helvetica', fontSize=9.5,
            textColor=colors.HexColor('#CBD8EC'), leading=15,
            alignment=TA_LEFT, spaceAfter=0)
        box_data = [[Paragraph(summary, summary_style)]]
        box = Table(box_data, colWidths=[CONTENT_W])
        box.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#243554')),
            ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#3A5070')),
            ('TOPPADDING', (0,0), (-1,-1), 10),
            ('BOTTOMPADDING', (0,0), (-1,-1), 10),
            ('LEFTPADDING', (0,0), (-1,-1), 14),
            ('RIGHTPADDING', (0,0), (-1,-1), 14),
            ('ROWBACKGROUNDS', (0,0), (-1,-1), [colors.HexColor('#243554')]),
        ]))
        story.append(box)

    story.append(PageBreak())

    # ── PAGE 2: SCORE BREAKDOWN ───────────────────────────────────────────────
    story.append(Spacer(1, 0.5 * cm))
    story.append(Paragraph('Score Overzicht', styles['SectionTitle']))
    story.append(HRFlowable(width=CONTENT_W, thickness=2, color=C_NAVY, spaceAfter=10))

    # Bar chart
    if categories:
        chart = CategoryBarChart(categories, width=CONTENT_W)
        story.append(chart)
        story.append(Spacer(1, 0.5 * cm))

    # Score table
    table_data = [['Categorie', 'Score', 'Gewicht', 'Status']]
    for cat_name, info in categories.items():
        cat_score = info.get('score', 0)
        cat_weight = info.get('weight', '')
        sc = score_color(cat_score)
        label = score_label(cat_score)
        # Color-coded score cell
        table_data.append([
            cat_name,
            f'{cat_score}/100',
            cat_weight,
            label,
        ])

    col_widths = [CONTENT_W * 0.45, CONTENT_W * 0.15, CONTENT_W * 0.15, CONTENT_W * 0.25]
    score_table = Table(table_data, colWidths=col_widths)

    ts = TableStyle([
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,0), 8.5),
        ('FONTSIZE', (0,1), (-1,-1), 8.5),
        ('BACKGROUND', (0,0), (-1,0), C_NAVY),
        ('TEXTCOLOR', (0,0), (-1,0), C_WHITE),
        ('ALIGN', (1,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('GRID', (0,0), (-1,-1), 0.5, C_BORDER),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [C_WHITE, C_LIGHT]),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ])

    # Color-code status cells
    for i, (cat_name, info) in enumerate(categories.items(), start=1):
        cat_score = info.get('score', 0)
        sc = score_color(cat_score)
        ts.add('TEXTCOLOR', (3, i), (3, i), sc)
        ts.add('FONTNAME', (3, i), (3, i), 'Helvetica-Bold')

    score_table.setStyle(ts)
    story.append(score_table)

    # Weighted total row
    weighted = sum(
        info.get('score', 0) * float(info.get('weight', '0%').rstrip('%')) / 100
        for info in categories.values()
    )
    story.append(Spacer(1, 4))
    total_style = ParagraphStyle('TotalRow', fontName='Helvetica-Bold', fontSize=9,
                                  textColor=C_NAVY, leading=14)
    story.append(Paragraph(
        f'Gewogen totaalscore: <font color="#2D5BFF">{score}/100</font> — Grade: '
        f'<font color="{score_color(score).hexval() if hasattr(score_color(score), "hexval") else "#FFB300"}">'
        f'{score_grade(score)}</font>',
        total_style))

    story.append(PageBreak())

    # ── PAGE 3: KEY FINDINGS ──────────────────────────────────────────────────
    story.append(Spacer(1, 0.5 * cm))
    story.append(Paragraph('Belangrijkste Bevindingen', styles['SectionTitle']))
    story.append(HRFlowable(width=CONTENT_W, thickness=2, color=C_NAVY, spaceAfter=10))

    severity_colors = {
        'Critical': C_RED,
        'Kritiek':  C_RED,
        'High':     C_ORANGE,
        'Hoog':     C_ORANGE,
        'Medium':   C_AMBER,
        'Middel':   C_AMBER,
        'Low':      C_BLUE,
        'Laag':     C_BLUE,
    }

    if findings:
        findings_data = [['Ernst', 'Bevinding']]
        for f in findings:
            sev = f.get('severity', 'Medium')
            findings_data.append([sev, f.get('finding', '')])

        f_col_widths = [CONTENT_W * 0.15, CONTENT_W * 0.85]
        f_table = Table(findings_data, colWidths=f_col_widths)
        fts = TableStyle([
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('FONTSIZE', (0,0), (-1,0), 8.5),
            ('FONTSIZE', (0,1), (-1,-1), 8.5),
            ('BACKGROUND', (0,0), (-1,0), C_NAVY),
            ('TEXTCOLOR', (0,0), (-1,0), C_WHITE),
            ('ALIGN', (0,0), (0,-1), 'CENTER'),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('GRID', (0,0), (-1,-1), 0.5, C_BORDER),
            ('ROWBACKGROUNDS', (0,1), (-1,-1), [C_WHITE, C_LIGHT]),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
            ('FONTNAME', (0,1), (0,-1), 'Helvetica-Bold'),
        ])
        for i, f in enumerate(findings, start=1):
            sev = f.get('severity', 'Medium')
            fc = severity_colors.get(sev, C_AMBER)
            fts.add('TEXTCOLOR', (0, i), (0, i), fc)
        f_table.setStyle(fts)
        story.append(f_table)
    else:
        story.append(Paragraph('Geen bevindingen beschikbaar.', styles['BodyText2']))

    story.append(PageBreak())

    # ── PAGE 4: ACTION PLAN ───────────────────────────────────────────────────
    story.append(Spacer(1, 0.5 * cm))
    story.append(Paragraph('Geprioriteerd Actieplan', styles['SectionTitle']))
    story.append(HRFlowable(width=CONTENT_W, thickness=2, color=C_NAVY, spaceAfter=10))

    def action_section(title, items, color, badge):
        if not items:
            return []
        elements = []
        header = Table([[Paragraph(f'<b>{badge}  {title}</b>',
                                   ParagraphStyle('AH', fontName='Helvetica-Bold',
                                                  fontSize=10, textColor=C_WHITE,
                                                  leading=14))]],
                       colWidths=[CONTENT_W])
        header.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), color),
            ('TOPPADDING', (0,0), (-1,-1), 7),
            ('BOTTOMPADDING', (0,0), (-1,-1), 7),
            ('LEFTPADDING', (0,0), (-1,-1), 10),
            ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ]))
        elements.append(header)
        rows = []
        for i, item in enumerate(items, 1):
            rows.append([
                Paragraph(f'<b>{i}.</b>', ParagraphStyle('Num', fontName='Helvetica-Bold',
                                                          fontSize=9, textColor=color,
                                                          leading=13, alignment=TA_CENTER)),
                Paragraph(item, ParagraphStyle('AI', fontName='Helvetica', fontSize=8.5,
                                               textColor=C_BODY, leading=13))
            ])
        action_table = Table(rows, colWidths=[0.5*cm, CONTENT_W - 0.5*cm])
        action_table.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('TOPPADDING', (0,0), (-1,-1), 5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 5),
            ('LEFTPADDING', (0,0), (-1,-1), 6),
            ('RIGHTPADDING', (0,0), (-1,-1), 6),
            ('ROWBACKGROUNDS', (0,0), (-1,-1), [C_WHITE, C_LIGHT]),
            ('GRID', (0,0), (-1,-1), 0.3, C_BORDER),
        ]))
        elements.append(action_table)
        elements.append(Spacer(1, 0.3 * cm))
        return elements

    story += action_section('Quick Wins — Deze Week', quick_wins, C_GREEN, '⚡')
    story += action_section('Middellange Termijn — Deze Maand', medium_term, C_BLUE, '📈')
    story += action_section('Strategische Initiatieven — Dit Kwartaal', strategic, C_NAVY, '🎯')

    # ── PAGE 5: COMPETITOR TABLE (optional) ───────────────────────────────────
    if competitors:
        story.append(PageBreak())
        story.append(Spacer(1, 0.5 * cm))
        story.append(Paragraph('Concurrentievergelijking', styles['SectionTitle']))
        story.append(HRFlowable(width=CONTENT_W, thickness=2, color=C_NAVY, spaceAfter=10))

        comp_names = [c.get('name', '') for c in competitors[:3]]
        headers = ['Factor', brand] + comp_names
        rows_keys = [
            ('Positionering', 'positioning'),
            ('Prijs', 'pricing'),
            ('Social Proof', 'social_proof'),
            ('Content', 'content'),
        ]

        comp_data = [headers]
        for label, key in rows_keys:
            row = [label, data.get(key, '—') if key in data else '—']
            for c in competitors[:3]:
                row.append(c.get(key, '—'))
            comp_data.append(row)

        n_cols = len(headers)
        col_w = CONTENT_W / n_cols
        comp_table = Table(comp_data, colWidths=[col_w] * n_cols)
        comp_table.setStyle(TableStyle([
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('FONTSIZE', (0,0), (-1,-1), 7.5),
            ('BACKGROUND', (0,0), (-1,0), C_NAVY),
            ('TEXTCOLOR', (0,0), (-1,0), C_WHITE),
            ('BACKGROUND', (1,1), (1,-1), C_ACCENT),
            ('FONTNAME', (0,1), (0,-1), 'Helvetica-Bold'),
            ('GRID', (0,0), (-1,-1), 0.5, C_BORDER),
            ('ROWBACKGROUNDS', (0,1), (-1,-1), [C_WHITE, C_LIGHT]),
            ('VALIGN', (0,0), (-1,-1), 'TOP'),
            ('TOPPADDING', (0,0), (-1,-1), 5),
            ('BOTTOMPADDING', (0,0), (-1,-1), 5),
            ('LEFTPADDING', (0,0), (-1,-1), 6),
            ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ]))
        story.append(comp_table)

    # ── FINAL PAGE: METHODOLOGY ───────────────────────────────────────────────
    story.append(PageBreak())
    story.append(Spacer(1, 0.5 * cm))
    story.append(Paragraph('Methodologie & Scoringsmodel', styles['SectionTitle']))
    story.append(HRFlowable(width=CONTENT_W, thickness=2, color=C_NAVY, spaceAfter=10))

    method_text = [
        ('Content & Messaging (25%)',
         'Kopykwaliteit, waardepropositie, headline-duidelijkheid, CTA-tekst, en consistentie van de merkstem.'),
        ('Conversion Optimization (20%)',
         'Social proof, formulierontwerp, CTA-plaatsing, bezwaarafhandeling, e-mailvastlegging, en aankoopfrictie.'),
        ('SEO & Vindbaarheid (20%)',
         'Title-tags, metabeschrijvingen, koptekststructuur, structured data, interne links, afbeeldingsoptimalisatie en paginasnelheid.'),
        ('Concurrentiepositie (15%)',
         'Differentiatiepositie t.o.v. concurrenten, prijsstrategie, vergelijkingscontent en marktbewustzijn.'),
        ('Brand & Trust (10%)',
         'Teamidentiteit, reviews/testimonials, privacynaleving, contacttoegankelijkheid en merkpersoonlijkheid.'),
        ('Groei & Strategie (10%)',
         'E-mailmarketingstrategie, groeislussen, contentstrategie, retentiemechanismen en businessmodelschaalbaarheid.'),
    ]

    for title, desc in method_text:
        story.append(Paragraph(f'<b>{title}</b>', styles['SubTitle']))
        story.append(Paragraph(desc, styles['BodyText2']))

    story.append(Spacer(1, 0.5 * cm))
    story.append(HRFlowable(width=CONTENT_W, thickness=0.5, color=C_BORDER, spaceAfter=6))
    story.append(Paragraph(
        'Gegenereerd door AI Marketing Suite voor Claude Code  ·  seniorease.nl',
        ParagraphStyle('Footer2', fontName='Helvetica', fontSize=7.5,
                       textColor=C_MUTED, alignment=TA_CENTER, leading=12)))

    # ── Build ─────────────────────────────────────────────────────────────────
    doc.build(story, onFirstPage=make_header_footer(brand, url),
              onLaterPages=make_header_footer(brand, url))
    print(f'PDF gegenereerd: {output_path}')


# ── Entry point ────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    if len(sys.argv) >= 2 and sys.argv[1] != '--demo':
        json_path = sys.argv[1]
        out_path  = sys.argv[2] if len(sys.argv) >= 3 else 'MARKETING-REPORT.pdf'
        with open(json_path, encoding='utf-8') as f:
            data = json.load(f)
        build_pdf(data, out_path)
    else:
        # Demo mode
        demo = {
            "url": "https://example.com",
            "date": datetime.today().strftime('%d %B %Y'),
            "brand_name": "Example Co",
            "overall_score": 62,
            "executive_summary": "Example Co scoort 62/100. De site heeft een solide basis maar mist e-mailcapture en duidelijke differentiatie. De grootste kans ligt in het toevoegen van een nieuwsbrief-optin en het herwerken van de homepage-hero. Geschat omzetpotentieel: €2.000–€5.000/maand bij volledige implementatie.",
            "categories": {
                "Content & Messaging": {"score": 68, "weight": "25%"},
                "Conversion Optimization": {"score": 52, "weight": "20%"},
                "SEO & Vindbaarheid": {"score": 74, "weight": "20%"},
                "Concurrentiepositie": {"score": 48, "weight": "15%"},
                "Brand & Trust": {"score": 70, "weight": "10%"},
                "Groei & Strategie": {"score": 55, "weight": "10%"},
            },
            "findings": [
                {"severity": "Critical", "finding": "Geen e-mailcapture aanwezig op de website."},
                {"severity": "High", "finding": "Homepage-headline is generiek en niet gedifferentieerd."},
                {"severity": "Medium", "finding": "Slechts 1 review in de structured data."},
                {"severity": "Low", "finding": "Breadcrumb schema ontbreekt."},
            ],
            "quick_wins": ["Voeg e-mailoptin toe in de footer", "Herstel de title-tag op de homepage", "Voeg FAQPage schema toe"],
            "medium_term": ["Publiceer app in Google Play Store", "Maak een Over-ons pagina", "Bouw een contencluster rondom DigiD"],
            "strategic": ["Introduceer een recurring omzetstroom", "Sluit partnerschap met openbare bibliotheken", "Ontwikkel een videocursus product"],
            "competitors": [
                {"name": "Concurrent A", "positioning": "Marktleider", "pricing": "€30/jaar", "social_proof": "10.000+ reviews", "content": "Uitgebreid"},
            ]
        }
        build_pdf(demo, 'MARKETING-REPORT-sample.pdf')
