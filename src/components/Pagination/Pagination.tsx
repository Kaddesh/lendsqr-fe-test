import { useState, useRef, useEffect } from 'react'
import dropdownIcon from '../../assets/icons/dropdown.svg'
import '../Pagination/Pagination.scss'

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (itemsPerPage: number) => void
  leftArrowIcon?: string
  rightArrowIcon?: string
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  leftArrowIcon,
  rightArrowIcon,
}) => {
  const [showItemsDropdown, setShowItemsDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowItemsDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)
      
      if (currentPage <= 3) {
        // Show first 3 pages, then ellipsis, then last 2
        pages.push(2, 3)
        pages.push('...')
        pages.push(totalPages - 1, totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Show first 2, then ellipsis, then last 3
        pages.push(2)
        pages.push('...')
        pages.push(totalPages - 2, totalPages - 1, totalPages)
      } else {
        // Show first, ellipsis, current-1, current, current+1, ellipsis, last
        pages.push(2)
        pages.push('...')
        pages.push(currentPage - 1, currentPage, currentPage + 1)
        pages.push('...')
        pages.push(totalPages - 1, totalPages)
      }
    }
    
    return pages
  }

  const itemsPerPageOptions = [5, 10, 20, 50, 100]

  const handleItemsPerPageSelect = (value: number) => {
    onItemsPerPageChange(value)
    setShowItemsDropdown(false)
    // Reset to first page when changing items per page
    onPageChange(1)
  }

  return (
    <div className="pagination-container">
      <div className="pagination-left">
        <div className="items-per-page-wrapper">
          <div className="items-per-page-label">Showing</div>
          <div className="items-per-page-select" ref={dropdownRef}>
            <button
              className="items-per-page-button"
              onClick={() => setShowItemsDropdown(!showItemsDropdown)}
            >
              <span>{itemsPerPage}</span>
              <img src={dropdownIcon} alt="dropdown" className="dropdown-icon" />
            </button>
            {showItemsDropdown && (
              <div className="items-per-page-dropdown">
                {itemsPerPageOptions.map((option) => (
                  <button
                    key={option}
                    className={`dropdown-item ${itemsPerPage === option ? 'active' : ''}`}
                    onClick={() => handleItemsPerPageSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="items-per-page-label">out of {totalItems}</div>
        </div>
      </div>

      <div className="pagination-right">
        <button
          className="pagination-arrow"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {leftArrowIcon ? (
            <img src={leftArrowIcon} alt="previous" />
          ) : (
            <span>‹</span>
          )}
        </button>

        <div className="page-numbers">
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="page-ellipsis">
                  ...
                </span>
              )
            }
            return (
              <button
                key={page}
                className={`page-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => onPageChange(page as number)}
              >
                {page}
              </button>
            )
          })}
        </div>

        <button
          className="pagination-arrow"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {rightArrowIcon ? (
            <img src={rightArrowIcon} alt="next" />
          ) : (
            <span>›</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default Pagination
