import './dashboardCard.scss'

type DashboardCardProps = {
  iconSrc: string
  iconBgColor: string
  content: string
  number: string | number
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  iconSrc,
  iconBgColor,
  content,
  number,
}) => {
  // Convert hex color to rgba with 10% opacity
  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  return (
    <div className="dashboard-card">
      <div 
        className="dashboard-card__icon-wrapper"
        style={{ backgroundColor: hexToRgba(iconBgColor, 0.1) }}
      >
        <img src={iconSrc} alt={content} />
      </div>
      <div className="dashboard-card__content">
        <p className="dashboard-card__text">{content}</p>
        <p className="dashboard-card__number">{number}</p>
      </div>
    </div>
  )
}

export default DashboardCard
