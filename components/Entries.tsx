import { shops } from "../lib/shop";

export default function Entries({ steps }: { steps: number[] }) {
    return (
        <main>
            {shops.map((shop, i) => (
                <section key={i}>
                    <h3>{shop}</h3>
                    <p>{steps[i]} Steps</p>
                </section>
            ))}
            <style jsx>{`
                main {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                }

                section {
                    min-width: 15em;
                    padding: 1em;
                    margin: 1em;
                    border-radius: 1em;

                    text-align: center;
                    background-color: gold;
                }
            `}</style>
        </main>
    );
}
