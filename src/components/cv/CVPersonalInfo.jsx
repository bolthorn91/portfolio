export const CVPersonalInfoComponent = ({
    profileImage,
    name,
    position
}) => {
    return (
        <section className="flex align-center justify-center w-full text-center py-5 sm:py-10 mt-5 sm:mt-10">
        <div className="w-full sm:w-1/4 mb-7 sm:mb-0">
            <img src={profileImage} className="rounded-lg w-96 user-none" alt="" />
        </div>
        <div className="w-full text-center py-5 sm:py-10 mt-5 sm:mt-10">
            <p className="mb-2 text-xl">{name}</p>
            <p className="text-">{position}</p>
        </div>
    </section>
    ) 
}