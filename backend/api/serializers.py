from rest_framework import serializers
from .models import Player, PlayerStats, Game, ScoreEntry

class PlayerSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')  # 追加！

    class Meta:
        model = Player
        fields = ['id', 'name', 'owner']  # 明示的に指定

class PlayerStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlayerStats
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class ScoreEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = ScoreEntry
        fields = '__all__'
