import { useAppSelector } from '@/store/hooks';
import { getDepartments } from '@/store/publicCms';
import { Col, Row } from 'antd';

export const DepartmentsSection = () => {
  const departments = useAppSelector(getDepartments());
  return (
    <section className='py-2 py-md-5'>
      <Row gutter={[10, 10]}>
        {departments?.items.map((department) => (
          <Col span={24} sm={12} lg={8} xxl={6}>
            <div>
              {department.name && (
                <p className='h6 text-orange'>{department.name}</p>
              )}
              {department.contacts.map((contact) => (
                <div>
                  {contact.title && (
                    <p>
                      <span>{`${contact.title}: `}</span>
                      {contact.contactNum || ''}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Col>
        ))}
      </Row>
    </section>
  );
};
