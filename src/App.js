import {Component} from 'react'
import TabItem from './components/TabItem'
import ProjectItem from './components/ProjectItem'
import './App.css'

class App extends Component {
  state = {
    activeTabId: 'Men',
    productsList: [],
  }

  componentDidMount() {
    this.getProducts()
  }

  clickTabItem = tabValue => {
    this.setState({activeTabId: tabValue})
  }

  getProducts = async () => {
    this.setState({})

    try {
      const apiUrl =
        'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json' // Replace with your actual API endpoint
      const options = {method: 'GET'}
      const response = await fetch(apiUrl, options)

      if (!response.ok) {
        throw new Error(`Failed to fetch products. Status: ${response.status}`)
      }

      const fetchedData = await response.json()

      const updatedData = fetchedData.categories.flatMap(category =>
        category.category_products.map(product => ({
          title: product.title,
          vendor: product.vendor,
          price: product.price,
          badgeText: product.badge_text,
          id: product.id,
          image: product.second_image || product.image, // Using second_image if available, otherwise fallback to image
          compareAtPrice: product.compare_at_price,
          categoryName: category.category_name,
        })),
      )

      this.setState({
        productsList: updatedData,
      })
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <>
        <div>
          <ul className="products-list">
            {productsList.map(product => (
              <ProjectItem projectDetails={product} key={product.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  getFilteredProjects = () => {
    const {activeTabId, productsList} = this.state
    const filteredProjects = productsList.filter(
      eachProjectDetails => eachProjectDetails.categoryName === activeTabId,
    )

    return filteredProjects
  }

  render() {
    const {activeTabId} = this.state
    const filteredProjects = this.getFilteredProjects()
    return (
      <>
        <div className="app-container">
          <h1 className="title">SELECT YOUR CHOICE</h1>

          <ul className="tabs-container">
            {['Men', 'Women', 'Kids'].map(tabName => (
              <TabItem
                key={tabName}
                tabDetails={{categoryName: tabName, displayText: tabName}}
                clickTabItem={this.clickTabItem}
                isActive={activeTabId === tabName}
              />
            ))}
          </ul>

          <ul className="project-list-container">
            {filteredProjects.map(projectDetails => (
              <ProjectItem
                key={projectDetails.id}
                projectDetails={projectDetails}
              />
            ))}
          </ul>
        </div>
        {/* {this.renderProductsList()} */}
      </>
    )
  }
}

export default App
