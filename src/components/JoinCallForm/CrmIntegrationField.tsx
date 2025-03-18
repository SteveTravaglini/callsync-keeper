
import { useState, useEffect } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { CrmType } from '@/lib/types';
import { Database, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { loadCrmConfig } from '@/lib/crm/crmUtils';
import { useNavigate } from 'react-router-dom';

interface CrmIntegrationFieldProps {
  control: Control<any>;
}

const CrmIntegrationField = ({ control }: CrmIntegrationFieldProps) => {
  const [hasCrmConfig, setHasCrmConfig] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const config = loadCrmConfig();
    setHasCrmConfig(!!config && !!config.apiKey);
  }, []);
  
  const handleConfigureCrm = () => {
    navigate('/settings/crm');
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium flex items-center gap-2">
          <Database className="h-4 w-4" />
          CRM Integration
        </h3>
        
        <Button variant="ghost" size="sm" onClick={handleConfigureCrm}>
          <Settings className="h-4 w-4 mr-1" />
          Configure
        </Button>
      </div>
      
      <FormField
        control={control}
        name="syncToCrm"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <FormLabel>Sync to CRM</FormLabel>
              <FormDescription>
                Automatically sync this meeting recording to your CRM
              </FormDescription>
            </div>
            <FormControl>
              <Switch 
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={!hasCrmConfig}
              />
            </FormControl>
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="crmType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>CRM Platform</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              disabled={!hasCrmConfig}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select CRM" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="salesforce">Salesforce</SelectItem>
                <SelectItem value="hubspot">HubSpot</SelectItem>
                <SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              {!hasCrmConfig 
                ? "Please configure your CRM integration first" 
                : "Select which CRM to sync with"}
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};

export default CrmIntegrationField;
