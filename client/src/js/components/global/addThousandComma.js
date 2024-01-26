function addThousandComma(number) {
  if(!number || Number.isNaN(+number)) {
    return ;
  };

  return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default addThousandComma;