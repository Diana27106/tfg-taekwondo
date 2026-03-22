import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProTable from '../../components/admin/ProTable';
import FeedbackMessages from '../../components/admin/FeedbackMessages';
import { Users, Activity, Target, ShieldCheck } from 'lucide-react';

const DashboardPage = () => {

  const stats = [
    { name: 'Usuarios Totales', value: '2,845', icon: Users, change: '+12%', changeType: 'positive' },
    { name: 'Entrenamientos Activos', value: '450', icon: Activity, change: '+5.4%', changeType: 'positive' },
    { name: 'Competencias Pendientes', value: '12', icon: Target, change: '-2', changeType: 'negative' },
    { name: 'Accesos de Admin', value: '3', icon: ShieldCheck, change: '0', changeType: 'neutral' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 animate-fade-in">
        
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Dashboard General
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Vista panorámica del sistema "Doble Cara". Bienvenido al panel de control avanzado.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.name} className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 px-4 pt-5 pb-12 sm:px-6 sm:pt-6 shadow-sm border border-gray-200 dark:border-gray-800 transition-all hover:shadow-md">
              <dt>
                <div className="absolute rounded-xl bg-blue-50 dark:bg-blue-500/10 p-3">
                  <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className={`ml-2 flex items-baseline text-sm font-semibold
                  ${stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 
                    stat.changeType === 'negative' ? 'text-red-600 dark:text-red-400' : 
                    'text-gray-500 dark:text-gray-400'}
                `}>
                  {stat.change}
                </p>
              </dd>
            </div>
          ))}
        </div>

        {/* Pro Table Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Directorio de Usuarios</h2>
            <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">Ver todos</button>
          </div>
          <ProTable />
        </div>

        {/* Feedback Component Demo section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <FeedbackMessages />
        </div>
        
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
