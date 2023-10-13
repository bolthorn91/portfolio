export const CVSectionHeader = ({title}) => (
    <section
        className="w-full flex space-between mb-4"
    >
        <h2 
            className="w-full"
            style={{borderBottom: '1px dotted black'}}>
                {title}
        </h2>
        <div className="w-full"></div>
    </section>
)