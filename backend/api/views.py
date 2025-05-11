from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Player, PlayerStats, Game, ScoreEntry
from .serializers import PlayerSerializer, PlayerStatsSerializer, GameSerializer, ScoreEntrySerializer

class PlayerViewSet(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class PlayerStatsViewSet(viewsets.ModelViewSet):
    queryset = PlayerStats.objects.all()
    serializer_class = PlayerStatsSerializer
    permission_classes = [IsAuthenticated]

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticated]

class ScoreEntryViewSet(viewsets.ModelViewSet):
    queryset = ScoreEntry.objects.all()
    serializer_class = ScoreEntrySerializer
    permission_classes = [IsAuthenticated]
