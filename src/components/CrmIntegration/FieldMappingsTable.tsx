
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { CrmFieldMapping, CrmType } from '@/lib/types';
import { Pencil, Save, Trash, Plus } from 'lucide-react';

interface FieldMappingsTableProps {
  mappings: CrmFieldMapping[];
  onUpdate: (mappings: CrmFieldMapping[]) => void;
  crmType: CrmType;
}

const FieldMappingsTable = ({ mappings, onUpdate, crmType }: FieldMappingsTableProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [localMappings, setLocalMappings] = useState<CrmFieldMapping[]>(mappings);
  
  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };
  
  const handleSave = (index: number) => {
    setEditingIndex(null);
    onUpdate(localMappings);
  };
  
  const handleDelete = (index: number) => {
    const updatedMappings = [...localMappings];
    updatedMappings.splice(index, 1);
    setLocalMappings(updatedMappings);
    onUpdate(updatedMappings);
  };
  
  const handleAdd = () => {
    const newMapping: CrmFieldMapping = {
      crmField: '',
      crmFieldType: 'standard',
      sourceField: 'title',
      isRequired: false,
      defaultValue: '',
    };
    
    const updatedMappings = [...localMappings, newMapping];
    setLocalMappings(updatedMappings);
    setEditingIndex(updatedMappings.length - 1);
  };
  
  const updateMapping = (index: number, field: keyof CrmFieldMapping, value: any) => {
    const updatedMappings = [...localMappings];
    updatedMappings[index] = {
      ...updatedMappings[index],
      [field]: value,
    };
    setLocalMappings(updatedMappings);
  };
  
  // Source field options
  const sourceFields = [
    { value: 'title', label: 'Call Title' },
    { value: 'date', label: 'Call Date' },
    { value: 'duration', label: 'Call Duration' },
    { value: 'transcript', label: 'Full Transcript' },
    { value: 'summary', label: 'AI Summary' },
    { value: 'action_items', label: 'Action Items' },
    { value: 'key_points', label: 'Key Points' },
  ];
  
  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>CRM Field</TableHead>
            <TableHead>Field Type</TableHead>
            <TableHead>Source Field</TableHead>
            <TableHead>Required</TableHead>
            <TableHead>Default Value</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localMappings.map((mapping, index) => (
            <TableRow key={index}>
              <TableCell>
                {editingIndex === index ? (
                  <Input
                    value={mapping.crmField}
                    onChange={(e) => updateMapping(index, 'crmField', e.target.value)}
                    placeholder={`${crmType === 'salesforce' ? 'Subject' : 'hs_call_title'}`}
                  />
                ) : (
                  mapping.crmField || '-'
                )}
              </TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <Select
                    value={mapping.crmFieldType}
                    onValueChange={(value) => updateMapping(index, 'crmFieldType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  mapping.crmFieldType === 'standard' ? 'Standard' : 'Custom'
                )}
              </TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <Select
                    value={mapping.sourceField}
                    onValueChange={(value: any) => updateMapping(index, 'sourceField', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sourceFields.map((field) => (
                        <SelectItem key={field.value} value={field.value}>
                          {field.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  sourceFields.find(f => f.value === mapping.sourceField)?.label || mapping.sourceField
                )}
              </TableCell>
              <TableCell>
                <Switch 
                  checked={mapping.isRequired}
                  onCheckedChange={(checked) => updateMapping(index, 'isRequired', checked)}
                  disabled={editingIndex !== index}
                />
              </TableCell>
              <TableCell>
                {editingIndex === index ? (
                  <Input
                    value={mapping.defaultValue || ''}
                    onChange={(e) => updateMapping(index, 'defaultValue', e.target.value)}
                    placeholder="Default value (optional)"
                  />
                ) : (
                  mapping.defaultValue || '-'
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {editingIndex === index ? (
                    <Button size="icon" variant="outline" onClick={() => handleSave(index)}>
                      <Save className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button size="icon" variant="outline" onClick={() => handleEdit(index)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                  <Button size="icon" variant="outline" className="text-red-500" onClick={() => handleDelete(index)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Button variant="outline" onClick={handleAdd} className="mt-2">
        <Plus className="h-4 w-4 mr-2" />
        Add Field Mapping
      </Button>
    </div>
  );
};

export default FieldMappingsTable;
