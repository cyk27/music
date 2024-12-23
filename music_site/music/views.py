from django.shortcuts import render, get_object_or_404
from .models import Singer, Song

def home(request):
    top_singers = Singer.objects.all()[:5]  # 获取前5位歌手
    songs = Song.objects.all()[:10]  # 获取前10首歌曲
    return render(
        request, 'music/home.html',
        {
            'top_singers': top_singers,
            'songs': songs,

        }
    )
def singers(request):
    singers = Singer.objects.all()
    return render(request,'music/singers.html',{'singers':singers})

def singer_detail(request, singer_id):
    singer = get_object_or_404(Singer, pk=singer_id)
    songs = Song.objects.filter(artist=singer)
    return render(request,'music/singer_detail.html', {'singer': singer,'songs': songs})

def song_detail(request):
    songs = Song.objects.all()  # 获取所有歌曲
    return render(
        request,
        'music/song_detail.html',
        {
            'songs': songs,
        }
    )