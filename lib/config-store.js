
const Const = require('./const');

class ConfigStore {

    constructor(params) {
        this._workspace = params.workspace;
        this._configTargetPicker = params.configTargetPicker;
    }

    get(configName) {
        const extensionConfig = this._workspace.getConfiguration(Const.EXTENSION_ID);
        return extensionConfig.get(configName);
    }

    async set(configName, configValue) {
        const configTarget = await this._configTargetPicker.pick();
        const extensionConfig = this._workspace.getConfiguration(Const.EXTENSION_ID);
        return extensionConfig.update(configName, configValue, configTarget);
    }

}

module.exports = ConfigStore;
