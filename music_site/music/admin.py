from django.contrib import admin
from .models import Singer,Song
@admin.register(Singer)
class SingerAdmin(admin.ModelAdmin):
    pass
@admin.register(Song)
class SongAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'artist',
        'duration',
        'file_path',
        'updated'
    )
    list_filter = (
        'artist',
        'updated'
    )