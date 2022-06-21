
function getCustomer(id, callback) {
  const customer = customers.find(ele => ele.id === id)
  setTimeout(() => {
    callback(customer)
  }, 1500)
}

function getOrders(email, callback) {
  const customerId = customers.find(ele => ele.email === email)?.id
  const customerOrders = orders.filter(ele => ele.customerId === customerId)
  setTimeout(() => {
    callback(customerOrders)
  }, 1500)
}