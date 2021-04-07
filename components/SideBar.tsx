import React from 'react';
import { createStyle } from '../lib/misc';
import { stringYears, times, views } from '../lib/data';
import css from '../pages/[time]/index.module.scss';
import { Checkboxes, UseCheckbox } from './Checkboxes';
import { RadioLinks } from './RadioLinks';

const style = createStyle(css);

interface Props {
    currentView: keyof typeof views;
    currentTime: keyof typeof times;
    yearFilter: UseCheckbox[0];
    setYearFilter: UseCheckbox[1];
}

export const SideBar = ({
    currentView,
    currentTime,
    yearFilter,
    setYearFilter,
}: Props) => {
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
                <Checkboxes
                    options={stringYears}
                    selected={yearFilter}
                    setSelected={setYearFilter}
                />
            </section>
        </aside>
    );
};
