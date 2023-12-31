export const statusRisk = [
  {label: 'GREEN', value: <i className="fa-solid fa-square-check" style={{color: "#26ADC9"}}></i>},
  {label: 'RED', value: <i className="fa-solid fa-circle-xmark" style={{color: "#ff0000"}}></i>},
  {label: 'AMBER', value: <i className="fa-solid fa-triangle-exclamation" style={{color: "#ffc000"}}></i>},
  {label: 'QUESTIONMARK', value: <i className="fa-solid fa-question"></i>},
]

export const statusExport = [
  {label: 'GREEN', value: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADoSURBVHgB7ZK7DcIwEIb/MwzACEhATxdaNkA8alaACXA2ICPQ85gjG6AgpGxAFsCHDQKhEJHYEEGRr7F1Ov/fyTqg4tdQutDahtMaY6mvDdgRnwnyOPRWz0WR7tLh0iHc0BS3wfBWYBrhCGUMJlAyHwmYOWCmAKUIFPzDuDfjGp/wdYEOjyaebO/ChVDXpXATmC/Qh+8anisAEUcjTz4kluG5Ar12s/YmXBiJUKpvG26o5zXoCaSWYD/yfNvwQoK7pLMOB6TQhSWFt4jIPtxK4MqrgJDAFUKcK2BW86zGAuGJfuuj4u+4AOEVVpSd+MfgAAAAAElFTkSuQmCC'},
  {label: 'RED', value: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFpSURBVHgBpZTRUcJAEIZ3Dx6ZJFQgViB2gBWIFYgVqBUQK9AOlA6wArCDdGA64MLw6q3/nmdmJAea+L9ws3f3sf/uXpgi2gwGEzJmysyXTJRpTIhKFimcc4vhbrfev8M/AFk2wuFnBCd0RIAuhfl+aG3ZAAEyNiIrChn8QaVjvgKsqEGaSYCMqJ0sYOeamfE0kccOEFXWQyk8Qwtrer0V/UPI6sKgO7MDm6fE/FAHsPax6GE37Rvms9iece463W7zKvuqfWptXiXJHMDmWR2TKk03dKhTIjlgPqsAySkua+iYjOHoOqI+hqviWEaoSW2HgjW1KTKPcEreJMkTPN7u72hhtU61Hdh0xiwwb++N/xR5YQzjJAxjZ/n2YyrXsLamrhJ5VYYv9gfzDX4stVcJu3e68CB9K5qebrSA2PBoyxoUYIWHIdXfCOj0W3isxXcsOhu+Ac7N8M0Z48BJuFyhO0tYWWpN9u98Ao4QoGTDsFzCAAAAAElFTkSuQmCC'},
  {label: 'AMBER', value: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAETSURBVHgB5ZPBUcJAFIa/jRo9bgmhBDuQgwdvdqAdqBWoFTBWYAnm5ozChA4oAUrgnGFYHpsdSNgNLHDgwD+TvNm3Ly/fzvsXTiVToGPqkpgiM+CdGa8xtWpns18yUkZ2UXKrHphwFOEVH/LW9kmF9BhCRzduJOd01T1DDiJMKbzcxXbK1obmj2cJmb/BndsLKnhkd9Si1vDNxZ6LU0HpqK7EKMKUJ+p0JblU5rUK3WYj1ULXHERJhxuWA6nnpyEb+YSVTWKkueabbYSmz6NkfrxPDV+u+sXb27BRstG+R0jKEYWUNClXDVttUlEsB5ITVmb+1wOy/w7YZF+tbFQRVoPIOFxaTmFv0KVdGhm94ZOz0AKK6kXgvxEtqQAAAABJRU5ErkJggg=='},
  {label: 'QUESTIONMARK', value: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGaSURBVHgBlVTLbcJAELWNhRAnl+BUEFIBSQVJSvAFhDgAFWAqCBwQggukgiQVhBJcwqYCfESWZee9jW0ti9coI41mNX5+89mZta0GWa/XPcdxqHGapmI8HkcmrK079vu9lyTJBMcp1NM+izzPj9DFaDQSRqLNZvOI6B81BLqILMsCkB1Lh1MettvtC0i+NZIFSnrAT0+2ba8Uv08sA18QweHDvGlRZ8PhMOx2u6LT6USDwWDKLFQAs2crKiI4QkZRMBFIlswS/TpReUYpB2SmNtw7n89TtbS+lo2HLEP8NC8daPAzLbL60bLixVjubrfrAeRrROzBHP7KAdKvwt7rQeWY1JBcCXuDUj9R3lxrQZlVzwGo8aoR6MDeFCShARM7rVYrukH0XtxM2IARciAR7WQZhhAgOT/ozcTAI1D2nbw1lLcygCRBAwkDHWklEQZuCRPXATnVVAMPd29REQVBEAP8av1fZuXyXiwtp9f6WxX/BoEMrC7t1TPCvStWpl9DyPJX7XZ7ySrUD7bVIJxY13V9zho0anrYfgF6UM6catF9PQAAAABJRU5ErkJggg=='},
]

export const topicCommentArr = ['RUB', 'Communicable disease', 'Sanctions', 'NCBR', 'War', 'Cyber'];

export const topicDisable = ['Unused definitions', 'Readability'];
