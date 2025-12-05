# 💰 YouTube Data API - Kosten Overzicht
## SeniorEase Automatisering

---

## ✅ **GOED NIEUWS: GRATIS!**

De YouTube Data API v3 is **volledig gratis** binnen het dagelijkse quotum!

---

## 📊 Gratis Quotum

**Standaard quotum per dag:** **10.000 eenheden**

Dit is **meer dan genoeg** voor onze scripts!

---

## 🔢 Quotum Kosten per Actie

### **Wat onze scripts gebruiken:**

| Actie | Quotum Kosten | Aantal per Script |
|-------|---------------|-------------------|
| **Playlist aanmaken** (`playlists.insert`) | 50 eenheden | 4 playlists = 200 eenheden |
| **Playlists ophalen** (`playlists.list`) | 1 eenheid | 1x = 1 eenheid |
| **Video metadata bijwerken** (`videos.update`) | 50 eenheden | Per video |
| **Video toevoegen aan playlist** (`playlistItems.insert`) | 50 eenheden | Per video |
| **Analytics ophalen** (`analytics.reports.query`) | 1 eenheid | Per request |

### **Voorbeeld: Playlists Script**

**`setup-playlists.js` gebruikt:**
- 4x playlist aanmaken: 4 × 50 = **200 eenheden**
- 1x playlists ophalen (check): 1 × 1 = **1 eenheid**
- **Totaal: ~201 eenheden**

**Dagelijks quotum: 10.000 eenheden**  
**Gebruikt: 201 eenheden**  
**Over: 9.799 eenheden** ✅

---

## 📈 Andere Acties (voor referentie)

| Actie | Quotum Kosten |
|-------|---------------|
| Video uploaden | 1.600 eenheden |
| Video zoeken | 100 eenheden |
| Video details ophalen | 1 eenheid |
| Kanaal info ophalen | 1 eenheid |
| Comments ophalen | 1 eenheid |

---

## 💡 Praktisch Voorbeeld

### **Scenario: Normaal gebruik**

**Per week:**
- 3 video's uploaden: 3 × 1.600 = 4.800 eenheden
- 3 video's metadata bijwerken: 3 × 50 = 150 eenheden
- 3 video's toevoegen aan playlists: 3 × 50 = 150 eenheden
- Analytics ophalen: 7 × 1 = 7 eenheden
- **Totaal: ~5.107 eenheden per week**

**Per dag:** ~730 eenheden  
**Dagelijks quotum:** 10.000 eenheden  
**Over:** 9.270 eenheden ✅

---

## ⚠️ Wat Als Je Meer Nodig Hebt?

### **Quotum Verhogen**

Als je meer dan 10.000 eenheden per dag nodig hebt:

1. **Aanvraag via Google Cloud Console**
   - Ga naar "APIs & Services" → "Quotas"
   - Klik op YouTube Data API v3
   - Klik "Edit Quotas"
   - Vraag verhoging aan

2. **Mogelijke kosten:**
   - **Eerste verhoging:** Meestal nog gratis
   - **Grote verhogingen:** Mogelijk kosten (afhankelijk van gebruik)
   - **Google bepaalt** per aanvraag

### **Voor SeniorEase:**

**Je hebt waarschijnlijk NOOIT een verhoging nodig!**

- 10.000 eenheden = ~6 video's uploaden per dag
- Of ~200 video's metadata bijwerken per dag
- Of ~200 video's toevoegen aan playlists per dag

**Voor een kanaal met 3 video's per week is dit ruim voldoende!**

---

## 💰 Kosten Samenvatting

### **Voor onze scripts:**

| Script | Quotum Gebruik | Kosten |
|-------|----------------|--------|
| `setup-playlists.js` | ~201 eenheden | **GRATIS** ✅ |
| Video metadata bijwerken | 50 per video | **GRATIS** ✅ |
| Video toevoegen aan playlist | 50 per video | **GRATIS** ✅ |
| Analytics ophalen | 1 per request | **GRATIS** ✅ |

### **Totaal kosten: €0,00** 🎉

---

## 📊 Monitoring

### **Quotum Checken:**

1. Ga naar [Google Cloud Console](https://console.cloud.google.com)
2. "APIs & Services" → "Dashboard"
3. Kies je project
4. Zie quotum gebruik

### **Waarschuwingen Instellen:**

1. "APIs & Services" → "Quotas"
2. Kies YouTube Data API v3
3. Stel waarschuwing in bij 80% gebruik (8.000 eenheden)

---

## ✅ Conclusie

**Voor SeniorEase YouTube automatisering:**

- ✅ **YouTube Data API is GRATIS**
- ✅ **10.000 eenheden per dag is ruim voldoende**
- ✅ **Geen extra kosten verwacht**
- ✅ **Geen creditcard nodig** (voor standaard quotum)

**Je kunt veilig de scripts gebruiken zonder zorgen over kosten!** 🎬

---

## 🔗 Referenties

- [YouTube Data API Quota Costs](https://developers.google.com/youtube/v3/determine_quota_cost)
- [YouTube Data API Pricing](https://developers.google.com/youtube/v3/getting-started#quota)
- [Google Cloud Console](https://console.cloud.google.com)

---

**Laatste update:** 23 november 2025  
**Status:** Kosten Overzicht - Gratis voor normaal gebruik


