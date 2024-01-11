import './index.css'

const TabItem = props => {
  const {tabDetails, clickTabItem, isActive} = props
  const {categoryName, displayText} = tabDetails
  const onClickTabItem = () => {
    clickTabItem(categoryName)
  }

  const activeTabBtnClassName = isActive ? 'active-tab-btn' : ''

  return (
    <li className="tab-item-container ">
      <button
        type="button"
        className={`tab-btn ${activeTabBtnClassName}`}
        onClick={onClickTabItem}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
