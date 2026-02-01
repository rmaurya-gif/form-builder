import { useFormStore } from '../store/formStore'
import type { FormField } from '../store/formStore'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Trash2, GripVertical, Plus } from 'lucide-react'

const FormBuilder = () => {
  const { formName, fields, setFormName, addField, updateField, removeField, reorderFields, exportForm } = useFormStore()



  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-6">
        <div>
          <Card>
            <CardContent sx={{ p: 2 }}>
              <TextField
                label="Form Name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Enter form name"
                fullWidth
                variant="outlined"
              />
            </CardContent>
          </Card>
          <div className="flex gap-6">
            <div className="w-80 flex-shrink-0">
              <Card>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Typography variant="h6">
                    Add Fields
                  </Typography>
                  <Button onClick={() => addField('text')} fullWidth variant="outlined" sx={{ justifyContent: 'flex-start' }}>
                    Text Input
                  </Button>
                  <Button onClick={() => addField('textarea')} fullWidth variant="outlined" sx={{ justifyContent: 'flex-start' }}>
                    Text Area
                  </Button>
                  <Button onClick={() => addField('checkbox')} fullWidth variant="outlined" sx={{ justifyContent: 'flex-start' }}>
                    Checkbox
                  </Button>
                  <Button onClick={() => addField('radio')} fullWidth variant="outlined" sx={{ justifyContent: 'flex-start' }}>
                    Radio Button
                  </Button>
                  <Button onClick={() => addField('date')} fullWidth variant="outlined" sx={{ justifyContent: 'flex-start' }}>
                    Date Picker
                  </Button>
                  <Button onClick={() => console.log(exportForm())} fullWidth variant="contained" sx={{ mt: 2 }}>
                    Export Form
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="flex-1">
              <Card>
                <CardHeader title="Form Fields" />
                <CardContent>
                  {fields.length === 0 ? (
                    <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                      No fields added yet. Add some from the sidebar.
                    </Typography>
                  ) : (
                    <div className="flex flex-col gap-6">
                      {fields.map((field) => (
                        <FieldItem key={field.id} field={field} onUpdate={updateField} onRemove={removeField} />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        <div className="flex gap-6">
        <div style={{ width: 320, flexShrink: 0 }}>
          {/* Sidebar */}
          <Card sx={{ position: 'sticky', top: 24 }}>
            <CardHeader
              title={
                <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Plus size={20} />
                  Add Fields
                </Typography>
              }
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Button
                onClick={() => addField('text')}
                fullWidth
                variant="outlined"
                sx={{ justifyContent: 'flex-start' }}
              >
                Text Input
              </Button>
              <Button
                onClick={() => addField('textarea')}
                fullWidth
                variant="outlined"
                sx={{ justifyContent: 'flex-start' }}
              >
                Text Area
              </Button>
              <Button
                onClick={() => addField('checkbox')}
                fullWidth
                variant="outlined"
                sx={{ justifyContent: 'flex-start' }}
              >
                Checkbox
              </Button>
              <Button
                onClick={() => addField('radio')}
                fullWidth
                variant="outlined"
                sx={{ justifyContent: 'flex-start' }}
              >
                Radio Button
              </Button>
              <Button
                onClick={() => addField('date')}
                fullWidth
                variant="outlined"
                sx={{ justifyContent: 'flex-start' }}
              >
                Date Picker
              </Button>
              <Button
                onClick={() => console.log(exportForm())}
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
              >
                Export Form
              </Button>
            </CardContent>
          </Card>
        </div>
        <div style={{ flex: 1 }}>
          {/* Main Form Area */}
          <Card>
            <CardHeader title="Form Fields" />
            <CardContent>
              {fields.length === 0 ? (
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  No fields added yet. Add some from the sidebar.
                </Typography>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                      {fields.map((field) => (
                        <FieldItem key={field.id} field={field} onUpdate={updateField} onRemove={removeField} />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </CardContent>
          </Card>
        </>
    </div>
  )
}

interface FieldItemProps {
  field: FormField
  onUpdate: (id: string, updates: Partial<FormField>) => void
  onRemove: (id: string) => void
}

interface FieldItemProps {
  field: FormField
  onUpdate: (id: string, updates: Partial<FormField>) => void
  onRemove: (id: string) => void
}

const FieldItem = ({ field, onUpdate, onRemove }: FieldItemProps) => {

  const updateOptions = (index: number, value: string) => {
    if (field.options) {
      const newOptions = [...field.options]
      newOptions[index] = value
      onUpdate(field.id, { options: newOptions })
    }
  }

  const addOption = () => {
    if (field.options) {
      onUpdate(field.id, { options: [...field.options, 'New Option'] })
    }
  }

  const removeOption = (index: number) => {
    if (field.options) {
      const newOptions = field.options.filter((_, i) => i !== index)
      onUpdate(field.id, { options: newOptions })
    }
  }

  return (
    <Card sx={{ boxShadow: 1, border: 1, borderColor: 'divider' }}>
      <CardContent sx={{ p: 3 }}>
        <div className="flex items-center gap-2 mb-4">
          <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
            {field.type} Field
          </Typography>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => onRemove(field.id)}
            sx={{ marginLeft: 'auto' }}
          >
            <Trash2 size={16} />
          </Button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Label"
              value={field.label}
              onChange={(e) => onUpdate(field.id, { label: e.target.value })}
              variant="outlined"
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.required}
                  onChange={(e) => onUpdate(field.id, { required: e.target.checked })}
                />
              }
              label="Required"
            />
          </div>

          {(field.type === 'checkbox' || field.type === 'radio') && field.options && (
            <div>
              <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>
                Options
              </Typography>
              <div className="flex flex-col gap-2">
                {field.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <TextField
                      value={option}
                      onChange={(e) => updateOptions(index, e.target.value)}
                      variant="outlined"
                      fullWidth
                    />
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => removeOption(index)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
                <Button variant="outlined" size="small" onClick={addOption} fullWidth sx={{ mt: 1 }}>
                  <Plus size={14} style={{ marginRight: 4 }} />
                  Add Option
                </Button>
              </div>
            </div>
          )}

          {field.type === 'date' && (
            <div>
              <DatePicker
                value={field.defaultDate}
                onChange={(date) => onUpdate(field.id, { defaultDate: date })}
                slotProps={{ textField: { label: 'Default Date (Optional)' } }}
              />
            </div>
          )}


        </div>
      </CardContent>
    </Card>
  )
}

// const FormPreview = ({ fields, formName }: { fields: FormField[], formName: string }) => {
  return (
    <Card>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          {formName || 'Untitled Form'}
        </Typography>
        <form style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {fields.map((field) => (
            <div key={field.id}>
              {field.type === 'text' && (
                <TextField
                  label={field.label}
                  required={field.required}
                  variant="outlined"
                  fullWidth
                />
              )}
              {field.type === 'textarea' && (
                <TextField
                  label={field.label}
                  required={field.required}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                />
              )}
              {field.type === 'checkbox' && field.options && (
                <div>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {field.label} {field.required && '*'}
                  </Typography>
                  {field.options.map((option, idx) => (
                    <FormControlLabel
                      key={idx}
                      control={<Checkbox />}
                      label={option}
                    />
                  ))}
                </div>
              )}
              {field.type === 'radio' && field.options && (
                <div>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {field.label} {field.required && '*'}
                  </Typography>
                  {/* For simplicity, use checkboxes, or add RadioGroup */}
                  {field.options.map((option, idx) => (
                    <FormControlLabel
                      key={idx}
                      control={<Checkbox />} // Placeholder, should be Radio
                      label={option}
                    />
                  ))}
                </div>
              )}
              {field.type === 'date' && (
                <DatePicker
                  label={field.label}
                  defaultValue={field.defaultDate}
                  slotProps={{ textField: { fullWidth: true, required: field.required } }}
                />
              )}
            </div>
          ))}
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormBuilder