import { Injectable } from '@nestjs/common';
import { UpdateSystemSettingDto } from '@validators';
import { SystemSetting } from 'src/models/SystemSettings.model';
@Injectable()
export class SyetemsettingsService {
  async updateOrCreateSettings(
    settingData: UpdateSystemSettingDto,
  ): Promise<SystemSetting> {
    let setting = await SystemSetting.findOne();

    if (!setting) {
      setting = await SystemSetting.create(settingData);
    } else {
      await setting.update(settingData);
    }
    return setting;
  }

  async getSytemSettings() {
    return await SystemSetting.findOne();
  }
}
