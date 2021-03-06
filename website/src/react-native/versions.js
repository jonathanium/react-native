/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('React');
var Site = require('Site');
var Metadata = require('Metadata');

var versions = React.createClass({
  render: function() {
    var availableDocs = (Metadata.config.RN_AVAILABLE_DOCS_VERSIONS || '').split(',');
    var latestVersion = Metadata.config.RN_LATEST_VERSION;

    var versions = [
      {
        title: 'master',
        path: '/react-native/releases/next',
        release: null,
        type: 'master',
      },
    ].concat(availableDocs.map((version) => {
      const isLatest =  latestVersion === version;
      const isRC = latestVersion < version;

      var title = version;
      if (isRC) {
        title += '-RC';
      }

      return {
        title: title,
        path: isLatest ? '/react-native' : '/react-native/releases/' + version,
        release: 'https://github.com/facebook/react-native/releases/tag/v' + version + '.0' + (isRC ? '-rc.0' : ''),
        type: isLatest ? 'latest' : (isRC ? 'release-candidate' : 'release'),
      }
    }));

    if (!latestVersion) {
      versions = [
        {
          title: 'current',
          path: '/react-native',
          release: null,
          type: 'latest',
        },
      ].concat(versions);
    }

    var latests = versions.filter(function(version) {
      return version.type === 'latest';
    });
    var masters = versions.filter(function(version) {
      return version.type === 'master';
    });
    var releaseCandidates = versions.filter(function(version) {
      return version.type === 'release-candidate';
    });
    var releases = versions.filter(function(version) {
      return version.type === 'release';
    });

    return (
      <Site section="versions" title="React Native Versions">
        <section className="content wrap documentationContent nosidebar">
          <div className="inner-content">
            <h1>React Native Versions</h1>
            <p>React Native follows a 2-week release train. Every two weeks, a new branch created off master enters the <a href="versions.html#rc">Release Candidate</a> phase, and the previous Release Candidate branch is released and considered <a href="versions.html#latest">stable</a>.</p>
            <a name="latest" />
            <h3>Current Version (Stable)</h3>
            <table className="versions">
              <tbody>
                {latests.map((version) =>
                  <tr>
                    <th>{version.title}</th>
                    <td><a href={version.path}>Documentation</a></td>
                    <td>{version.release && <a href={version.release}>Release Notes</a>}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <p>This is the version that is configured automatically when you run <code>react-native init</code>. We highly recommend using the current version of React Native when starting a new project.</p>
            <p>If you have an existing project that uses React Native, read the release notes to learn about new features and fixes. You can follow <a href="/react-native/docs/upgrading.html">our guide to upgrade your app</a> to the latest version.</p>
            <a name="rc" />
            <h3>Pre-release Versions</h3>
            <table className="versions">
              <tbody>
                {masters.map((version) =>
                  <tr>
                    <th>master</th>
                    <td><a href={version.path}>Documentation</a></td>
                    <td>{version.release && <a href={version.release}>Release Notes</a>}</td>
                  </tr>
                )}
                {releaseCandidates.map((version) =>
                  <tr>
                    <th>{version.title}</th>
                    <td><a href={version.path}>Documentation</a></td>
                    <td>{version.release && <a href={version.release}>Release Notes</a>}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <p>For those who live on the bleeding edge. Only recommended if you're actively contributing code to React Native, or if you need to verify how your application behaves in an upcoming release.</p>

            <a name="archive" />
            <h3>Past Versions</h3>
            <table className="versions">
              <tbody>
                {releases.map((version) =>
                  <tr>
                    <th>{version.title}</th>
                    <td><a href={version.path}>Documentation</a></td>
                    <td>{version.release && <a href={version.release}>Release Notes</a>}</td>
                  </tr>
                )}
              </tbody>
            </table>
            <p>You can find past versions of React Native <a href="https://github.com/facebook/react-native/releases">on GitHub</a>. The release notes can be useful if you would like to learn when a specific feature or fix was released.</p>
            <p>You can also view the docs for a particular version of React Native by clicking on the Docs link next to the release in this page. You can come back to this page and switch the version of the docs you're reading at any time by clicking on the version number at the top of the page.</p>
          </div>
        </section>
      </Site>
    );
  }
});

module.exports = versions;
