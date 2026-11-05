

export default function ContentInfo({ contentInfo, contentDetails }) {
    return (
        <div className={`content-info content-${contentInfo.id}`} title={contentInfo.label}>
            {contentInfo.icon(contentDetails)}
            <span className="content-value">{contentInfo.value(contentDetails)}</span>
        </div>
    )
}