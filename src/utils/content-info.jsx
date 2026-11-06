const formatNumberWithUnits = (number) => {
    number = parseFloat(number.replace(/,/g, '')); // Remove commas and convert to number
    const units = ['K', 'M', 'B', 'T'];
    let formattedNumber = number;
    let unitIndex = -1;
    while (formattedNumber >= 1000 && unitIndex < units.length - 1) {
        formattedNumber /= 1000;
        unitIndex++;
    }
    if (unitIndex >= 0) {
        formattedNumber = formattedNumber.toFixed(1) + units[unitIndex];
    }
    return formattedNumber;
}

const formatRuntime = (runtime) => {
    let formattedRuntime;
    if (runtime.match(/(\d+)\sh\s*(\d+)\smin/)) {
        const hours = parseInt(runtime.match(/(\d+)\sh/)[1]);
        const minutes = parseInt(runtime.match(/(\d+)\smin/)[1]);
        formattedRuntime = `${hours}h ${minutes}m`;
    } else if (runtime.match(/(\d+).*min/)) {
        const minutes = parseInt(runtime.match(/(\d+).*min/)[1]);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        formattedRuntime = hours > 0 ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}min`;
    } else {
        formattedRuntime = runtime; // Return the original string if it doesn't match expected formats
    }
    return formattedRuntime;
}

const getRatingStars = (rating, maxRating = 5, className = "star-container", children) => {
    // Convert the rating to a number between 0 and 5
    const ratingOutOfFive = (parseFloat(rating) / maxRating * 5);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (i <= ratingOutOfFive) {
            stars.push(<img src="/images/icons/star-filled.svg" alt="Star Rating" key={i} />);
        } else if (i === Math.ceil(ratingOutOfFive) && ratingOutOfFive % 1 !== 0) {
            stars.push(<img src="/images/icons/star-half-filled.svg" alt="Star Rating" key={i} />);
        } else {
            stars.push(<img src="/images/icons/star-empty.svg" alt="Star Rating" key={i} />);
        }
    }
    return <div className={className}>{stars}{children}</div>;
}

const contentInfos = {
    runtime: {
        id: 'runtime',
        label: 'Runtime',
        value: (content) => formatRuntime(content.Runtime),
        icon: () => <img src='/images/icons/clock.svg' alt="Runtime" />,

    },
    rating: {
        id: 'rating',
        label: 'Rating',
        value: (content) => formatNumberWithUnits(content.imdbVotes),
        icon: (content) => getRatingStars(content.imdbRating, 10),
    },
    views: {
        id: 'views',
        label: 'Views',
        value: (content) => formatNumberWithUnits(content.imdbVotes),
        icon: () => <img src='/images/icons/eye.svg' alt="Views" />,
    },
    releaseDate: {
        id: 'release-date',
        label: 'Release Date',
        value: (content) => content.Released,
        icon: () => (<span>Released at </span>), // No icon for release date
    },
    seasons: {
        id: 'seasons',
        label: 'Seasons',
        value: (content) => content.totalSeasons + ' Seasons',
        icon: () => <img src='/images/icons/stacks.svg' alt="Seasons" />,
    }
}

export {
    contentInfos, formatNumberWithUnits,
    formatRuntime,
    getRatingStars
};

