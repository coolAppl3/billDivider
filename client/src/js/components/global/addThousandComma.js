function addThousandComma(number) {
  if(!number || Number.isNaN(+number)) {
    if(number === 0) return '0.00';
    return ;
  };

  return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default addThousandComma;