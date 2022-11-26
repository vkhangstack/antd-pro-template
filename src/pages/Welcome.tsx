import { PageContainer } from '@ant-design/pro-components';
import { Card } from 'antd';
import React from 'react';

/**
 * For each individual card, components are extracted for reusable styles
 * @param param0
 * @returns
 */
const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 4px 0 rgba(35,49,128,0.02), 0 4px 8px 0 rgba(49,69,179,0.02)',
        borderRadius: '8px',
        fontSize: '14px',
        color: 'rgba(0,0,0,0.65)',
        textAlign: 'justify',
        lineHeight: ' 22px',
        padding: '16px 19px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: 'rgba(0, 0, 0, 0.85)',
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: 'rgba(0,0,0,0.65)',
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
      Understand more {'>'}
      </a>
    </div>
  );
};

const Welcome: React.FC = () => {
  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            'radial-gradient(circle at 97% 10%, #EBF2FF 0%, #F5F8FF 28%, #EBF1FF 124%)',
        }}
      >
        <div
          style={{
            backgroundPosition: '100% -30%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '274px auto',
            backgroundImage:
              "url('https://gw.alipayobjects.com/mdn/rms_a9745b/afts/img/A*BuFmQqsB2iAAAAAAAAAAAAAAARQnAQ')",
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: '#1A1A1A',
            }}
          >
            Welcome Ant Design Pro
          </div>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(0,0,0,0.65)',
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '65%',
            }}
          >
            Ant Design Pro is an integrated umi，Ant Design and ProComponents
            Scaffolding scheme. Committed to continue to build upwards on the basis of design specifications and basic components, extract typical templates/business components/supporting design resources, and further improve the experience of "users" and "designers" in the process of enterprise-level mid- and back-end product design and development .
          </p>
          <div
            style={{
              display: 'flex',
              gap: 16,
            }}
          >
            <InfoCard
              index={1}
              href="https://umijs.org/docs/introduce/introduce"
              title="Learn umi"
              desc="Umi is an extensible enterprise-level front-end application framework. Umi is based on routing, and supports configuration routing and convention routing at the same time, ensuring that routing functions are complete, and using this to expand functions."
            />
            <InfoCard
              index={2}
              title="Learn ant design"
              href="https://ant.design"
              desc="antd is a React UI component library based on Ant Design design system, which is mainly used to develop enterprise-level mid- and back-end products."
            />
            <InfoCard
              index={3}
              title="Learn Pro Components"
              href="https://procomponents.ant.design"
              desc="ProComponents is a more abstract template component based on Ant Design. It takes a component as a page as the development concept to bring a better experience for middle and back-end development"
            />
          </div>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
