import { useSearchParams } from "react-router-dom";
import MainTemplate from "../components/common/MainTemplate";
import Trailer from "../components/content-details/Trailer";
import '../scss/content-detail.scss';

export default function ContentDetailsPage() {
    const [searchParams] = useSearchParams();
    const contentId = searchParams.get("id");
    return (
        <MainTemplate id="content-detail" page="movies-and-shows">
            <Trailer
                id="thumbnail"
                trailer={{id: contentId}}
                carousel={false}
            />
        </MainTemplate>
    )
}