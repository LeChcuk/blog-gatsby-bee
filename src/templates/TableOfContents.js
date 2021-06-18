import React, {useMemo,useState, useEffect} from 'react';
import s from './TableOfContents.scss';


const TableOfContents = ({ toc,currentHeaderUrl }) => {

    const replaceItems = useMemo(() => {
        if (currentHeaderUrl) {
            return toc.replace(
                `"${currentHeaderUrl}"`,
                `"${currentHeaderUrl}" class="isCurrent"`
            );
        } else {
            console.log('else');
            return toc;
        }
    }, [currentHeaderUrl]);
    return (
        <div className="toc-container">
            <div className="toc-content">
                <div className="toc" dangerouslySetInnerHTML={{ __html: replaceItems }} />
            </div>
        </div>
    )
}

export default TableOfContents;