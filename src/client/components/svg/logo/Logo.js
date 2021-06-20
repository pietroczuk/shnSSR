import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import styles from './logo.module.scss';
import { Link } from 'react-router-dom';

const Logo = ({ white, miniLogo, customWidth, link }) => {
    const svgWidth = customWidth ? customWidth : 250;
    const logoWidth = miniLogo ? 54 : svgWidth;
    return (
        <div className={styles.logoContener} style={{ width: logoWidth + 'px' }}>
            <Link to={'/' + link}>
                <span className={styles.assitiveText}>Homepage</span>
                <div className={`${styles.logo} ${white ? styles.whiteLogo : ''}`}
                    style={{ width: svgWidth + 'px' }}>
                    <svg viewBox="0 0 528.59 41.316">
                        <path d="M11.729,0.996h11.288l-6.688,6.746h-4.6
       c-0.728,0-1.386,0.115-1.973,0.345C9.168,8.316,8.625,8.688,8.125,9.198C7.68,9.633,7.321,10.17,7.054,10.808
       c-0.243,0.576-0.372,1.214-0.384,1.917c0.012,0.702,0.135,1.354,0.364,1.954c0.242,0.588,0.605,1.13,1.091,1.629
       c0.5,0.512,1.043,0.888,1.631,1.132c0.6,0.268,1.259,0.402,1.973,0.402H21.77c1.623,0.013,3.137,0.301,4.542,0.862
       c1.382,0.573,2.646,1.423,3.796,2.548c2.3,2.325,3.455,5.105,3.469,8.336c0,3.195-1.157,5.967-3.469,8.318
       c-1.15,1.123-2.414,1.973-3.796,2.55c-1.405,0.573-2.919,0.86-4.542,0.86l-0.019-6.726c0.755,0,1.418-0.134,1.993-0.402
       c0.664-0.229,1.214-0.575,1.648-1.036c0.485-0.484,0.837-1.027,1.056-1.628c0.294-0.639,0.439-1.29,0.439-1.954
       c0-0.679-0.146-1.311-0.439-1.898c-0.244-0.563-0.607-1.105-1.094-1.628c-0.511-0.499-1.055-0.883-1.63-1.15
       c-0.612-0.243-1.263-0.363-1.955-0.363H11.729c-1.623,0-3.129-0.288-4.521-0.864c-1.394-0.573-2.665-1.424-3.814-2.549
       c-1.125-1.161-1.968-2.446-2.529-3.852C0.288,15.886,0,14.378,0,12.743c0-1.623,0.288-3.116,0.863-4.484
       c0.576-1.366,1.418-2.631,2.529-3.794C5.681,2.152,8.458,0.996,11.729,0.996z M64.372,0h6.669v40.34h-6.669V23.59H46.474h-9.027
       l6.671-6.745h20.255V0z M111.266,0v40.34L77.749,10.176V0l26.848,24.165V0H111.266z"/>
                        <path fill="#181818" d="M174.908,4.008c2.173,1.971,3.403,4.752,3.683,8.393h-1.839c-0.329-3.034-1.371-5.411-3.117-7.08
           c-1.8-1.669-4.204-2.474-7.324-2.474c-2.974,0-5.336,0.554-7.04,1.768c-1.934,1.264-2.877,3.132-2.877,5.61
           c0,2.227,1.182,3.943,3.542,5.262c1.039,0.601,3.306,1.413,6.755,2.42c4.158,1.217,7.039,2.331,8.593,3.334
           c2.741,1.775,4.111,4.302,4.111,7.539c0,3.035-1.228,5.46-3.638,7.229c-2.312,1.672-5.288,2.531-8.928,2.531
           c-3.774,0-6.801-1.016-8.972-2.985c-2.408-2.175-3.777-5.408-4.061-9.655h1.793c0.284,3.64,1.464,6.37,3.545,8.242
           c1.885,1.667,4.438,2.523,7.647,2.523c3.166,0,5.763-0.704,7.747-2.117c1.985-1.421,3.023-3.335,3.023-5.715
           c0-2.682-1.229-4.754-3.59-6.224c-1.322-0.856-3.917-1.814-7.792-2.93c-3.965-1.213-6.521-2.124-7.746-2.832
           c-2.598-1.564-3.873-3.741-3.873-6.569c0-3.089,1.181-5.418,3.636-7.033c2.078-1.516,4.82-2.221,8.17-2.221
           C169.948,1.024,172.829,1.984,174.908,4.008z"/>
                        <path fill="#181818" d="M188.422,1.024v17.085h22.434V1.024h1.842v37.533h-1.842V20.004h-22.434v18.554h-1.842V1.024H188.422z" />
                        <path fill="#181818" d="M224.279,1.024v38.031h-1.843V1.024H224.279z" />
                        <path fill="#181818" d="M236.278,1.024l21.914,34.704h0.096V1.024h1.843v37.491h-2.267L235.853,3.598h-0.095v34.918h-1.841V1.024
           H236.278z"/>
                        <path fill="#181818" d="M314.645,1.024c7.182,0,10.817,3.464,10.817,10.451c0,7.033-3.636,10.551-10.86,10.551h-11.717v16.489
           h-1.842V1.024H314.645z M302.885,20.137h11.669c3.113,0,5.378-0.788,6.894-2.259c1.416-1.416,2.171-3.565,2.171-6.402
           c0-2.836-0.755-4.991-2.171-6.351c-1.516-1.478-3.824-2.212-6.894-2.212h-11.669V20.137z"/>
                        <path fill="#181818" d="M362.316,6.549c3.036,3.434,4.581,7.823,4.581,13.216c0,5.35-1.545,9.788-4.581,13.271
           c-3.297,3.63-7.666,5.445-13.199,5.445c-5.594,0-10.014-1.86-13.206-5.497c-3.087-3.431-4.628-7.869-4.628-13.219
           c0-5.345,1.541-9.782,4.628-13.216c3.247-3.684,7.666-5.499,13.206-5.499C354.65,1.05,359.069,2.865,362.316,6.549z
            M337.456,7.765c-2.769,3.125-4.1,7.108-4.1,12c0,4.946,1.331,8.932,4.1,12.007c2.875,3.23,6.761,4.849,11.661,4.849
           c4.895,0,8.73-1.618,11.603-4.849c2.72-3.075,4.101-7.061,4.101-12.007c0-4.938-1.381-8.979-4.101-12
           c-2.872-3.232-6.708-4.846-11.603-4.846C344.216,2.919,340.331,4.532,337.456,7.765z"/>
                        <path fill="#181818" d="M394.086,4.108c2.176,1.969,3.4,4.741,3.688,8.371h-1.846c-0.328-3.025-1.373-5.397-3.113-7.058
           c-1.797-1.665-4.207-2.468-7.32-2.468c-2.979,0-5.34,0.554-7.037,1.761c-1.941,1.26-2.879,3.123-2.879,5.596
           c0,2.217,1.176,3.93,3.543,5.242c1.033,0.605,3.297,1.413,6.746,2.418c4.158,1.216,7.043,2.32,8.6,3.326
           c2.738,1.767,4.109,4.287,4.109,7.51c0,3.026-1.23,5.446-3.637,7.21c-2.318,1.667-5.289,2.523-8.932,2.523
           c-3.775,0-6.795-1.011-8.967-2.972c-2.412-2.172-3.779-5.396-4.064-9.628h1.791c0.287,3.623,1.471,6.346,3.547,8.211
           c1.887,1.663,4.438,2.519,7.65,2.519c3.164,0,5.76-0.698,7.742-2.112c1.984-1.411,3.023-3.326,3.023-5.696
           c0-2.676-1.225-4.743-3.584-6.203c-1.326-0.856-3.924-1.812-7.801-2.922c-3.967-1.21-6.512-2.118-7.742-2.823
           c-2.596-1.562-3.875-3.729-3.875-6.555c0-3.071,1.182-5.394,3.641-7.002c2.074-1.515,4.816-2.221,8.17-2.221
           C389.129,1.136,392.006,2.094,394.086,4.108z"/>
                        <path fill="#181818" d="M430.791,1.024v1.896h-12.848v35.681h-1.839V2.921h-12.939V1.024H430.791z" />
                        <path fill="#181818" d="M485.975,1.024c3.262,0,5.812,0.842,7.701,2.627c1.842,1.737,2.787,4.207,2.787,7.467
           c0,2.316-0.566,4.309-1.703,5.995c-1.18,1.683-2.83,2.729-4.906,3.257v0.104c3.584,0.844,5.572,3.209,5.902,7.093l0.422,5.471
           c0.188,2.313,0.662,4.154,1.467,5.52h-2.031c-0.662-1.312-1.039-3.047-1.229-5.15l-0.422-5.415
           c-0.193-2.42-1.043-4.152-2.557-5.202c-1.318-0.945-3.166-1.424-5.477-1.424h-12.092v17.191h-1.842V1.024H485.975z
            M473.838,19.479h12.045c2.834,0,5.006-0.79,6.566-2.365c1.418-1.477,2.168-3.473,2.168-5.94c0-2.686-0.705-4.733-2.029-6.1
           c-1.514-1.476-3.73-2.16-6.752-2.16h-11.998V19.479z"/>
                        <path fill="#181818" d="M524.1,3.953c2.168,1.97,3.398,4.756,3.682,8.405h-1.836c-0.338-3.043-1.369-5.421-3.121-7.094
           c-1.791-1.671-4.203-2.479-7.32-2.479c-2.977,0-5.34,0.556-7.035,1.768c-1.939,1.267-2.885,3.144-2.885,5.623
           c0,2.232,1.184,3.955,3.545,5.271c1.035,0.603,3.309,1.413,6.758,2.43c4.154,1.213,7.033,2.33,8.594,3.344
           c2.74,1.77,4.109,4.3,4.109,7.541c0,3.04-1.232,5.472-3.641,7.242c-2.312,1.676-5.287,2.535-8.924,2.535
           c-3.781,0-6.801-1.016-8.975-2.99c-2.412-2.177-3.777-5.42-4.066-9.672h1.797c0.283,3.646,1.463,6.379,3.545,8.257
           c1.889,1.671,4.439,2.53,7.648,2.53c3.162,0,5.766-0.708,7.744-2.129c1.986-1.417,3.027-3.342,3.027-5.722
           c0-2.679-1.229-4.761-3.584-6.231c-1.328-0.857-3.924-1.819-7.803-2.932c-3.967-1.216-6.518-2.132-7.744-2.838
           c-2.596-1.57-3.869-3.747-3.869-6.583c0-3.09,1.178-5.424,3.637-7.04c2.076-1.521,4.816-2.227,8.166-2.227
           C519.137,0.964,522.023,1.924,524.1,3.953z"/>
                        <path fill="#181818" d="M463.584,1.127V2.99H437.18V1.127H463.584z" />
                        <path fill="#181818" d="M463.584,36.754v1.863H437.18v-1.863H463.584z" />
                        <path fill="#181818" d="M457.562,18.134v1.859H437.18v-1.859H457.562z" />
                        <path fill="#181818" d="M294.749,1.127V2.99h-27.847V1.127H294.749z" />
                        <path fill="#181818" d="M294.749,36.754v1.863h-27.847v-1.863H294.749z" />
                        <path fill="#181818" d="M289.457,18.134v1.859h-22.555v-1.859H289.457z" />
                    </svg>
                </div>
            </Link>
        </div>
    );
}

export default withStyles(styles)(Logo);;