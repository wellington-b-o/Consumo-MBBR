function doPost(e) {
  const ss = SpreadsheetApp.openById("COLOQUE_ID_DA_SUA_PLANILHA_AQUI");
  const aba = ss.getSheetByName("Banco");

  const leitura = e.parameter.leitura;
  const usuario = e.parameter.usuario;
  const data = new Date();

  aba.appendRow([data, leitura, usuario]);

  return ContentService.createTextOutput(
    JSON.stringify({ result: "success" })
  ).setMimeType(ContentService.MimeType.JSON);
}