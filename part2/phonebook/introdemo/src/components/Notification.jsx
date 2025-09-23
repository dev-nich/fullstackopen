
const Notification = ({notification}) => {
    return <div className={notification.level}>{notification.message}</div>
}

export default Notification