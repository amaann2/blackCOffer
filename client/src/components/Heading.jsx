const Heading = ({ title, description = "commercial charts" }) => {
    return (
        <div className=" px-4 mb-3">
            <h1 className="text-xl font-semibold">{title}</h1>
            <p className="text-[#A6A4AB]">{description}</p>
        </div>
    )
}

export default Heading