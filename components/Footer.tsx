export function Footer() {
    return (
        <footer>
            <hr />
            Logo Designer: Mylena Bovo, Coders: James Clark, Wyatt Allaby
            <style jsx>{`
                footer {
                    text-align: center;
                    padding-top: 1em;
                    padding-bottom: 1em;
                    font-style: italic;
                }
                footer hr {
                    display: block;
                    text-align: center;
                    background-color: navy;
                    height: 0.2em;
                    width: 75vw
                }
            `}</style>
        </footer>
    );
}
// total step counter
// date submitted/not backwards
