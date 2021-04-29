import React from 'react';
import { createStyle } from '../lib/misc';
import { times, views } from '../lib/data';
import css from '../pages/[time]/index.module.scss';
import { YearFilter } from './YearFilter';
import { RadioLinks } from './RadioLinks';

const style = createStyle(css);

interface Props {
    currentView: keyof typeof views;
    currentTime: keyof typeof times;
}

export const SideBar = ({ currentView, currentTime }: Props) => {
    const viewOptions = Object.entries(views).map(([link, label]) => ({
        label,
        link: `/${currentTime}/${link}`,
    }));

    const timeOptions = Object.entries(times).map(([link, label]) => ({
        label,
        link: `/${link}/${currentView}`,
    }));

    return (
        <aside className={style('sidebar')}>
            <section>
                <h3>View</h3>
                <RadioLinks
                    options={viewOptions}
                    selected={views[currentView]}
                />
            </section>
            <section>
                <h3>Time</h3>
                <RadioLinks
                    options={timeOptions}
                    selected={times[currentTime]}
                />
            </section>
            <section>
                <h3>Year</h3>
                <YearFilter />
            </section>
        </aside>
    );
};
