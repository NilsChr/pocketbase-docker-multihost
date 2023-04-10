const config = {
    docker: {
        // 
        cpus: '4.0',

        //
        memory: '2g',

        //
        volume: '/Users/nils/VolumesDocker'
    },

    // Url to pocketbase version
    pocketBaseUrl: 'https://github.com/pocketbase/pocketbase/releases/download/v0.8.0/pocketbase_0.8.0_linux_amd64.zip',

    // App names
    apps: ['test1', 'test2']
}

module.exports = config;