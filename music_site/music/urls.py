from django.urls import path
from .views import home,song_detail,singer_detail,singers
from django.conf.urls.static import static
from django.conf import settings
app_name = 'music'
urlpatterns = [
    path('', home, name='home'),
    path('singer/<int:singer_id>/', singer_detail, name='singer_detail'),
    path('song', song_detail, name='song_detail'),
    path('singers',singers,name='singers')
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)