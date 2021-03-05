document.querySelector('#open').addEventListener('click', () => {
  const dialog = document.querySelector('#js-wc-dialog');
  dialog.setAttribute('visible', true);
  dialog.addEventListener('close', ({ detail }) => {
    console.log('close', detail);
    const jsValue = document.querySelector('#js-value').value;
    console.log(jsValue);
  });
});