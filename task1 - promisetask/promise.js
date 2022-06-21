function getCustomer(id) {
  return new Promise((resolve, reject) => {
    const customer = customers.find(ele => ele.id === id)
    setTimeout(() => {
      resolve(customer)
      reject('some thing went wrong')
    }, 1500)
  })
}

function getOrders(email) {
  return new Promise((resolve, reject) => {
    const customerId = customers.find(ele => ele.email === email)?.id
    const customerOrders = orders.filter(ele => ele.customerId === customerId)
    setTimeout(() => {
      resolve(customerOrders)
      reject('some thing went wrong')
    }, 1500)
  })
}