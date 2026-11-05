import MainTemplate from '../components/common/MainTemplate'
import '../scss/watch-list.scss'

export default function WatchListPage() {
    return (
        <MainTemplate id="watch-list" page="watch-list" cta={false}>
            <div className="watch-list">
                <h1>Watch List Page</h1>
            </div>
        </MainTemplate>
    )
}