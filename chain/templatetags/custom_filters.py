from django import template
register = template.Library()

@register.filter
def split_last(value, delimiter):
    """Splits the value by the delimiter and returns the last element."""
    parts = value.split(delimiter)
    if parts:
        return parts[-1]
    return ''