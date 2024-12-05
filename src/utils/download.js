export function downloadFile(data, filename) {
  let json = JSON.stringify(data);
  let a = document.createElement("a");
  a.setAttribute("type", "download");
  a.setAttribute(
    "href",
    URL.createObjectURL(new Blob([json], { type: "application/json" }))
  );
  a.setAttribute("download", filename);
  a.click();

  a.remove();
}
