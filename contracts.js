function saveContract(data) {
  let contracts = JSON.parse(localStorage.getItem("contracts")) || [];
  contracts.push(data);
  localStorage.setItem("contracts", JSON.stringify(contracts));
}

function getContracts() {
  return JSON.parse(localStorage.getItem("contracts")) || [];
}
