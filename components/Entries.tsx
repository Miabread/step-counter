import { shops } from "../lib/shop";

interface Props {
    data: number[];
    label: string;
}

export default function Entries({ data, label }: Props) {
    return (
        <main>
            {shops.map((shop, i) => (
                <section key={i}>
                    <h3>{shop}</h3>
                    <p>{data[i]} {label}</p>
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
