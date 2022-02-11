

function Pagination_c({elementsPerPage, totalElements}) {
  const pageNumbers = []
  console.log('elementsPerPage', elementsPerPage)
  console.log('totalElements', totalElements)

  for (let i = 1; i < Math.ceil(totalElements / elementsPerPage); i++) {
    pageNumbers.push(i)
  }
  console.log(pageNumbers)
  return (
      <div>

            <nav>
              <ul className="pagination">
              {pageNumbers.map(number => {
                return (
                <li key={number} className="pagination__item">
                  <a className="pagination__link">
                    {number}
                  </a>
                </li>
                )
              })}
              </ul>
            </nav>

      </div>
  )
}

export default Pagination_c