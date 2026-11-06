

export default function ContentInfo({ contentInfo, contentDetails, className }) {
    return (
        <div className={`content-info content-${contentInfo.id} ${className}`} title={contentInfo.label}>
            {contentInfo.icon(contentDetails)}
            <span className="content-value">{contentInfo.value(contentDetails)}</span>
        </div>
    )
}