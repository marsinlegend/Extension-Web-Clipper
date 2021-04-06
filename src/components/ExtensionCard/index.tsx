import React from 'react';
import { Card, Input, Modal } from 'antd';
import { FormattedMessage } from 'react-intl';
import { SerializedExtensionInfo } from '@/extensions/common';
import IconFont from '@/components/IconFont';
import { SettingOutlined } from '@ant-design/icons';
import { SchemaForm, LifeCycleTypes } from '@formily/antd';
import { toJS } from 'mobx';
import Container from 'typedi';
import { IExtensionService } from '@/service/common/extension';

interface ExtensionCardProps {
  manifest: SerializedExtensionInfo['manifest'];
  actions?: React.ReactNode[];
  className?: string;
}

const ReachableContext = React.createContext<{
  manifest: SerializedExtensionInfo['manifest'] | null;
  // eslint-disable-next-line no-undefined
}>({ manifest: null });

const config = () => {
  return {
    width: 800,
    content: (
      <>
        <ReachableContext.Consumer>
          {({ manifest }) => {
            const config = manifest!.config;
            const extensionId: string = manifest!.extensionId as string;
            const defaultValue =
              Container.get(IExtensionService).getExtensionConfig(extensionId) ||
              toJS(config?.default);
            return (
              <SchemaForm
                style={{ width: '100%' }}
                components={{ Input, textarea: Input.TextArea }}
                defaultValue={defaultValue}
                effects={$ => {
                  $(LifeCycleTypes.ON_FORM_VALUES_CHANGE).subscribe(data => {
                    if (data.mounted) {
                      Container.get(IExtensionService).setExtensionConfig(extensionId, data.values);
                    }
                  });
                }}
                schema={config!.scheme}
              ></SchemaForm>
            );
          }}
        </ReachableContext.Consumer>
      </>
    ),
  };
};

const ExtensionCard: React.FC<ExtensionCardProps> = ({ manifest, actions, className }) => {
  const extra: React.ReactNode[] = [manifest.version];
  const [modal, contextHolder] = Modal.useModal();

  if (manifest.config) {
    extra.push(
      <SettingOutlined
        style={{ marginLeft: 8 }}
        key="setting"
        onClick={() => {
          modal.info(config());
        }}
      />
    );
  }
  return (
    <React.Fragment>
      <ReachableContext.Provider value={{ manifest: manifest }}>
        {contextHolder}
      </ReachableContext.Provider>
      <Card
        className={className}
        actions={actions}
        extra={[extra]}
        title={<Card.Meta avatar={<IconFont type={manifest.icon} />} title={manifest.name} />}
      >
        <div style={{ height: 30 }}>
          {manifest.description || (
            <FormattedMessage
              id="preference.extensions.no.Description"
              defaultMessage="No Description"
            />
          )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default ExtensionCard;
