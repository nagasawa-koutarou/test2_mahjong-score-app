from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlayerViewSet, PlayerStatsViewSet, GameViewSet, ScoreEntryViewSet

router = DefaultRouter()
router.register(r'players', PlayerViewSet)
router.register(r'player-stats', PlayerStatsViewSet)
router.register(r'games', GameViewSet)
router.register(r'scores', ScoreEntryViewSet)

urlpatterns = [
    path('', include(router.urls)),  # APIのエンドポイントだけ集約
]
