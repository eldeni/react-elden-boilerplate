import express from "express";
import fs from 'fs';
import path from "path";
import { Provider as ReduxProvider } from 'react-redux';
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from 'react-router-dom';

import { calculateNextStateWhileSearchingForBundles } from '@server/serverApp/serverUtils';
import createExpress from '@server/serverApp/createExpress';
import LaunchStatus from '@server/constants/LaunchStatus';
import paths from '@server/paths';

export default createExpress({
  enhance: (app, state) => {
    const _build = fs.readFileSync(`${paths.distBundle}/build.json`);
    const build = JSON.parse(_build.toString('utf8'));
    console.info('server prod - webpack configuration', build);

    state.update(calculateNextStateWhileSearchingForBundles(build.entrypoints));
  
    app.use(express.static(paths.distBundle));
  },
});