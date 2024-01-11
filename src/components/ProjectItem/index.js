import './index.css'

const ProjectItem = props => {
  const {projectDetails} = props
  const {
    id,
    image,

    title,
    vendor,
    price,
    compareAtPrice,
  } = projectDetails
  return (
    <>
      <li className="project-item-container">
        <img
          className="project-item-image"
          src={image}
          alt={`project-item ${id}`}
        />
        <div className="project-item-details-container">
          <div className="card-container">
            <h1 className="project-item-title">{title}</h1>
            <p className="project-item-description">{vendor}</p>
          </div>
          <div className="card-container">
            <p className="project-item-description"> Rs {price}</p>
            <p className="project-item">{compareAtPrice}</p>
          </div>
          <button className="btn" type="button">
            ADD TO CART
          </button>
        </div>
      </li>
    </>
  )
}

export default ProjectItem
