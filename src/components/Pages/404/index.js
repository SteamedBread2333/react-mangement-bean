import React, { Component } from 'react'
import styles from './style.less'

export default class NotFound extends Component {
    render() {
        return (
            <div className={styles['not-found']}>
                <div className={styles['message']}>
                    <div className={styles['animation-alien']}>

                    </div>
                    <p>
                        The page you are looking for is either stolen by aliens or never existed.
                        </p>
                    <a onClick={() => { location.href = './#/property-profile' }} className="button">HEAD ON HOME</a>
                </div>
            </div>
        )
    }
}