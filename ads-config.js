/* ==========================================================
   PSDC  -  ADS SETTINGS  (Adsterra)
   ----------------------------------------------------------
   1. Adsterra dashboard -> Websites -> Add website -> add ad units
      (Banner 300x250 and Banner 160x600), then "Get code".
   2. Paste each code between the two backticks ` ` below.
   3. Change PSDC_ADS_ON to true, save and upload this file to GitHub.

   Ads NEVER appear on the test/paper screen. Only on:
     home_bottom   -> bottom of the home page (below the paper list)
     result_mid    -> result page, between the score graph and the answer review
     books_bottom  -> bottom of the Books page
     books_side    -> thin side column on the Books page (wide screens only)

   Leave a slot's code empty (``) to switch that single slot off.
   Do NOT add Popunder or floating Social Bar codes - they disturb students.
   ========================================================== */
window.PSDC_ADS_ON = true;       // <- set to true after pasting the codes
window.PSDC_ADS_SANDBOX = false;   // keeps ad code from redirecting the page. If ads show blank on the live site, try false.

window.PSDC_ADS = {
  home_bottom:  { width: 300, height: 250, code: `<script>
  atOptions = {
    'key' : 'c138d5d4c03c3d3c45007c0a9a674f64',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://bauval.org/22/c138d5d4c03c3d3c45007c0a9a674f64"></script>` },
  result_mid:   { width: 300, height: 250, code: `<script>
  atOptions = {
    'key' : 'c138d5d4c03c3d3c45007c0a9a674f64',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://bauval.org/22/c138d5d4c03c3d3c45007c0a9a674f64"></script>` },
  books_bottom: { width: 300, height: 250, code: `<script>
  atOptions = {
    'key' : 'c138d5d4c03c3d3c45007c0a9a674f64',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://bauval.org/22/c138d5d4c03c3d3c45007c0a9a674f64"></script>` },
  books_side:   { width: 160, height: 600, code: `<script>
  atOptions = {
    'key' : '3a55ae5b5fb91f66d9493db67e7adc92',
    'format' : 'iframe',
    'height' : 600,
    'width' : 160,
    'params' : {}
  };
</script>
<script src="https://bauval.org/22/3a55ae5b5fb91f66d9493db67e7adc92"></script>`, minViewportW: 1320, minViewportH: 780, avoid: '.sheet,.tab' }
};
